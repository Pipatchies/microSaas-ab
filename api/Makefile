# Makefile – Commandes de test pour l'API Django
# Usage : make test, make test-unit, make test-integration, make test-coverage

PYTHON = .\env\Scripts\python
PYTEST = .\env\Scripts\pytest
SRC = src

.PHONY: test test-unit test-integration test-coverage

## Lance tous les tests
test:
	$(PYTEST) tests/ -v

## Tests unitaires uniquement (models + serializers)
test-unit:
	$(PYTEST) tests/test_models.py tests/test_serializers.py -v

## Tests d'intégration uniquement (views)
test-integration:
	$(PYTEST) tests/test_views.py -v

## Rapport de couverture de code (objectif > 70%)
test-coverage:
	$(PYTEST) tests/ --cov=$(SRC) --cov-report=term-missing --cov-fail-under=70
