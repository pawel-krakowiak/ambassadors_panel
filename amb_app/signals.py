from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import User, UserActionHistory


@receiver(pre_save, sender=User)
def create_user_action_history(sender, instance, **kwargs):
    if instance.pk:
        original_user = User.objects.get(pk=instance.pk)

        if original_user.points != instance.points:
            if original_user.points < instance.points:
                points_diff = instance.points - original_user.points
                UserActionHistory.objects.create(
                    user=instance,
                    action_type='POINTS_ADDED',
                    action_desc=(
                        f"{original_user.get_full_name()} + {points_diff} points added: "
                        f"{original_user.points} -> {instance.points}"
                    )
                )
            elif original_user.points > instance.points:
                points_diff = original_user.points - instance.points
                UserActionHistory.objects.create(
                    user=instance,
                    action_type='POINTS_REMOVED',
                    action_desc=(
                        f"{original_user.get_full_name()} - {points_diff} points removed: "
                        f"{original_user.points} -> {instance.points}"
                    )
                )

        if original_user.location != instance.location:
            UserActionHistory.objects.create(
                user=instance,
                action_type='USER_LOCATION_CHANGED',
                action_desc=(
                    f"{original_user.get_full_name()} location changed: "
                    f"{original_user.location.location} -> {instance.location.location}"
                )
            )

        if original_user.is_active != instance.is_active:
            show_status = "active" if instance.is_active else "inactive"
            UserActionHistory.objects.create(
                user=instance,
                action_type='USER_STATUS_CHANGED',
                action_desc=(
                    f"{original_user.get_full_name()} status changed: "
                    f"Account is {show_status.capitalize()}"
                )
            )

        if original_user.staff != instance.staff:
            show_status = "a staff member" if instance.staff else "not a staff member"
            UserActionHistory.objects.create(
                user=instance,
                action_type='USER_PERMISSION_CHANGED',
                action_desc=(
                    f"{original_user.get_full_name()} status changed: "
                    f"User is {show_status} now",
                )
            )

        if original_user.admin != instance.admin:
            show_status = "an admin" if instance.admin else "not an admin"
            UserActionHistory.objects.create(
                user=instance,
                action_type='USER_PERMISSION_CHANGED',
                action_desc=(
                    f"{original_user.get_full_name()} status changed: "
                    f"User is {show_status} now",
                )
            )

        if original_user.instagram_name != instance.instagram_name:
            UserActionHistory.objects.create(
                user=instance,
                action_type='USER_INSTAGRAM_CHANGED',
                action_desc=(
                    f"{original_user.get_full_name()} Instagram name changed: "
                    f"\"{original_user.instagram_name}\" -> \"{instance.instagram_name}\""
                )
            )
