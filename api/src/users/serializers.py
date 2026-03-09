from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name")
        read_only_fields = ("id", "email")


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ("email", "password")

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )
        return value

    def create(self, validated_data):
        # We use email as the username for Django's auth system natively
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"] = serializers.EmailField(required=True)
        self.fields["password"] = serializers.CharField(
            write_only=True, required=True, style={"input_type": "password"}
        )
        # Remove the default username field provided by TokenObtainPairSerializer
        if "username" in self.fields:
            del self.fields["username"]

    def validate(self, attrs):
        # We know that the DB username is the same as the email based on RegisterSerializer
        attrs["username"] = attrs.get("email")

        # Now let the parent class do its authentication against the "username" field
        data = super().validate(attrs)

        # Add custom claims if needed
        data["email"] = self.user.email

        return data
