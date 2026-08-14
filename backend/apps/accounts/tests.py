from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework_simplejwt.authentication import JWTAuthentication

User = get_user_model()


class RegisterAPITests(APITestCase):
    def setUp(self):
        self.url = reverse("register")
        self.valid_data = {
            "email": "usuario@example.com",
            "first_name": "Usuario",
            "last_name": "Prueba",
            "password": "ClaveSegura123!",
        }

    def test_register_user_successfully(self):
        response = self.client.post(
            self.url,
            self.valid_data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

        user = User.objects.get(email="usuario@example.com")

        self.assertEqual(user.first_name, "Usuario")
        self.assertEqual(user.last_name, "Prueba")
        self.assertTrue(user.check_password("ClaveSegura123!"))

    def test_register_does_not_return_password(self):
        response = self.client.post(
            self.url,
            self.valid_data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotIn("password", response.data)

    def test_register_rejects_duplicate_email(self):
        User.objects.create_user(
            email="usuario@example.com",
            password="ClaveSegura123!",
        )

        response = self.client.post(
            self.url,
            self.valid_data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
        self.assertEqual(User.objects.count(), 1)

    def test_register_rejects_weak_password(self):
        data = self.valid_data.copy()
        data["email"] = "debil@example.com"
        data["password"] = "123"

        response = self.client.post(
            self.url,
            data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        self.assertEqual(User.objects.count(), 0)


class LoginJWTAPITests(APITestCase):
    def setUp(self):
        self.email = "usuario@example.com"
        self.password = "ClaveSegura123!"
        self.user = User.objects.create_user(
            email=self.email,
            password=self.password,
        )
        self.login_url = reverse("login")
        self.token_refresh_url = reverse("token_refresh")

    def test_login_successfully(self):
        response = self.client.post(
            self.login_url,
            {
                "email": self.email,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_rejects_incorrect_password(self):
        response = self.client.post(
            self.login_url,
            {
                "email": self.email,
                "password": "ClaveIncorrecta123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn("access", response.data)
        self.assertNotIn("refresh", response.data)

    def test_login_rejects_nonexistent_email(self):
        response = self.client.post(
            self.login_url,
            {
                "email": "inexistente@example.com",
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn("access", response.data)
        self.assertNotIn("refresh", response.data)

    def test_refresh_token_returns_new_access_token(self):
        login_response = self.client.post(
            self.login_url,
            {
                "email": self.email,
                "password": self.password,
            },
            format="json",
        )

        response = self.client.post(
            self.token_refresh_url,
            {"refresh": login_response.data["refresh"]},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_access_token_authenticates_user(self):
        login_response = self.client.post(
            self.login_url,
            {
                "email": self.email,
                "password": self.password,
            },
            format="json",
        )
        access_token = login_response.data["access"]
        request = APIRequestFactory().get(
            "/",
            HTTP_AUTHORIZATION=f"Bearer {access_token}",
        )

        authentication = JWTAuthentication().authenticate(request)

        self.assertIsNotNone(authentication)
        authenticated_user, validated_token = authentication
        self.assertEqual(authenticated_user, self.user)
        self.assertEqual(str(validated_token), access_token)
