import os


class Config:
    SECRET_KEY = os.urandom(24)
    PROPAGATE_EXCEPTIONS = True


class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False
    PRODUCTION = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    PRODUCTION = False


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    PRODUCTION = True
