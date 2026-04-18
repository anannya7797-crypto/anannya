from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class PortfolioAPITests(APITestCase):
    def test_api_root_is_available(self):
        response = self.client.get(reverse("api-root"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("endpoints", response.data)

    def test_contact_submission_accepts_valid_payload(self):
        response = self.client.post(
            reverse("contact-create"),
            {
                "name": "Anannya",
                "email": "anannya@example.com",
                "message": "I would love to collaborate on your portfolio backend.",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data["ok"])

    def test_ai_infer_returns_prediction(self):
        response = self.client.post(
            reverse("ai-infer"),
            {"text": "This backend setup is amazing and I love the clean API."},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(response.data["label"], {"Positive", "Neutral", "Negative"})
