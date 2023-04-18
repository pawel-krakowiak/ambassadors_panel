from django.test import TestCase
from .models import User

# Test create user with random fields
class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(email="test@gmail.com", first_name="Test", last_name="Test", password="test1234", location="Wrocław")
    def test_user(self):
        user = User.objects.get(email="test@gmail.com")
        
        self.assertEqual(user.email, "test@gmail.com")
    
