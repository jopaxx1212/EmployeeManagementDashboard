from django.db import models


class Project(models.Model):
    Project_ID = models.IntegerField(primary_key=True)
    Project_name = models.CharField(max_length=255)

    def __str__(self):
        return self.Project_name


class Department(models.Model):
    Department_ID = models.IntegerField(primary_key=True)
    Department_name = models.CharField(max_length=255)

    manager = models.ForeignKey(
        'Employee',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_departments'
    )

    def __str__(self):
        return self.Department_name


class Employee(models.Model):
    Employee_ID = models.AutoField(primary_key=True)
    Email = models.EmailField(max_length=255)
    Name = models.CharField(max_length=255)

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='employees'
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='team_members'
    )

    def __str__(self):
        return f"{self.Name} ({self.Employee_ID})"
