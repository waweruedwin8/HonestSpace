from django.core.management.base import BaseCommand
from properties.models import PropertyType, PropertyStatus


class Command(BaseCommand):
    help = "Populate PropertyType and PropertyStatus with default choices"

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("Populating Property Types..."))

        # Populate PropertyType
        for idx, (name, display_name) in enumerate(PropertyType.TYPE_CHOICES, start=1):
            obj, created = PropertyType.objects.get_or_create(
                name=name,
                defaults={
                    "display_name": display_name,
                    "category": "residential" if name not in ["commercial", "office", "shop", "warehouse", "land"] else "commercial",
                    "description": f"Default description for {display_name}",
                    "sort_order": idx,
                },
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created PropertyType: {display_name}"))
            else:
                self.stdout.write(self.style.WARNING(f"PropertyType already exists: {display_name}"))

        self.stdout.write(self.style.MIGRATE_HEADING("Populating Property Statuses..."))

        # Populate PropertyStatus
        for name, display_name in PropertyStatus.STATUS_CHOICES:
            obj, created = PropertyStatus.objects.get_or_create(
                name=name,
                defaults={
                    "display_name": display_name,
                    "description": f"Default description for {display_name}",
                },
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created PropertyStatus: {display_name}"))
            else:
                self.stdout.write(self.style.WARNING(f"PropertyStatus already exists: {display_name}"))

        self.stdout.write(self.style.SUCCESS("✅ Initial data population complete."))

