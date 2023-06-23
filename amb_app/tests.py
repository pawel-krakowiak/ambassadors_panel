from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Order, Reward, Location

User = get_user_model()


class LocationModelTestCase(TestCase):
    def setUp(self):
        self.location = Location.objects.create(
            location='Location A',
            location_code='A'
        )

    def test_location_str(self):
        self.assertEqual(str(self.location), "(A) Location A")

    def test_get_default_pk(self):
        default_pk = Location.get_default_pk()
        self.assertEqual(default_pk, self.location.pk)


class RewardModelTestCase(TestCase):
    def setUp(self):
        self.location = Location.objects.create(
            location='Location A',
            location_code='A'
        )
        self.reward = Reward.objects.create(
            name='Test Reward',
            location=self.location,
            points_price=50
        )

    def test_reward_str(self):
        expected_str = "Test Reward (50 punktów)"
        self.assertEqual(str(self.reward), expected_str)

    def test_location_name(self):
        self.assertEqual(self.reward.location_name, "Location A")

    def test_location_id(self):
        self.assertEqual(self.reward.location_id, self.location.id)


class UserModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='testpassword',
            name='John',
            surname='Doe',
            instagram_name='johndoe',
            location=None,
            points=100
        )

    def test_add_points(self):
        self.user.add_points(50)
        self.assertEqual(self.user.points, 150)

    def test_get_full_name(self):
        expected_name = "John Doe (testuser@example.com)"
        self.assertEqual(self.user.get_full_name(), expected_name)

    def test_get_short_name(self):
        self.assertEqual(self.user.get_short_name(), "testuser@example.com")


class OrderModelTestCase(TestCase):

    def setUp(self):
        self.location = Location.objects.create(
            location='Location A',
            location_code='A'
        )
        self.reward = Reward.objects.create(
            name='Test Reward',
            location=self.location,
            points_price=50
        )
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='testpassword',
            name='John',
            surname='Doe',
            instagram_name='johndoe',
            location=self.location,
            points=100
        )
        self.order = Order.objects.create(
            owner=self.user,
            reward=self.reward,
            status='ORDER_CREATED'
        )

    def test_create_order(self):
        self.assertIsInstance(self.order, Order)
        self.assertEqual(self.order.status, 'ORDER_CREATED')

    def test_generate_qr_code(self):
        self.order.generate_qr_code()
        self.assertTrue(self.order.qr_code)

    def test_open_qr_code_staff_user(self):
        self.assertFalse(self.order.is_completed)
        staff_user = User.objects.create_user(
            email='staffuser@example.com',
            password='staffpassword',
            name='Staff',
            surname='User',
            instagram_name='staffuser',
            location=self.location,
            points=0
        )
        self.order.open_qr_code(staff_user)
        self.assertTrue(self.order.is_completed)

    def test_approve_order(self):
        self.order.approve_order()
        self.assertEqual(self.order.status, 'ORDER_APPROVED')

    def test_complete_order(self):
        self.order.complete_order()
        self.assertTrue(self.order.completed)

    def test_get_total_price(self):
        reward2 = Reward.objects.create(
            name='Test Reward 2',
            location=self.location,
            points_price=30
        )
        self.order.reward_set.add(reward2)
        total_price = self.order.get_total_price()
        self.assertEqual(total_price, 80)

    def test_get_status_display(self):
        status_display = self.order.get_status_display()
        self.assertEqual(status_display, 'Order created and awaiting fulfillment')

    def test_get_owner_name(self):
        owner_name = self.order.get_owner_name()
        self.assertEqual(owner_name, self.user.get_full_name())

    def test_get_reward_name(self):
        reward_name = self.order.get_reward_name()
        self.assertEqual(reward_name, str(self.reward))

    def test_get_ordered_rewards(self):
        ordered_rewards = self.order.get_ordered_rewards()
        self.assertIn(self.reward, ordered_rewards)
