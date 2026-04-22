### Workarounds actifs dans le FIG ANS template

---

#### `template-page.html` et `template-page-md.html`

**Problème** : Dans `fhir2.base.template`, ces deux fichiers utilisent `page.path` pour construire le chemin de l'include :

```liquid
{% assign path = page.path | split: '.html' %}
{% include {{path}}.xml %}
```

Pour les pages générées dans un sous-répertoire langue (ex. `fr-FR/toc.html`), `page.path` vaut `fr-FR/toc.html`, ce qui produit `{% include fr-FR/toc.xml %}`. Jekyll cherche alors `_includes/fr-FR/toc.xml`, qui n'existe pas — le publisher ne génère pas ces fichiers langue-spécifiques.

**Fix appliqué** : utiliser `localPage` (défini en début de template comme `page.path | split: "/" | last`) à la place de `page.path` :

```liquid
{% assign path = localPage | split: '.html' | first %}
{% include {{path}}.xml %}
```

`localPage` pour `fr-FR/toc.html` donne `toc.html`, donc l'include devient `toc.xml` (racine), qui existe.

**Statut upstream** : Bug confirmé dans [`HL7/ig-template-base2`](https://github.com/HL7/ig-template-base2) — présent dans `includes/template-page.html` et `includes/template-page-md.html` (vérifié le 2026-04-22). Le code ant.xml qui devrait créer les répertoires `_includes/<lang>/` est commenté et la génération de `toc.xml`/`menu.xml` langue-spécifiques n'est pas implémentée côté publisher Java.

**À faire** : Surveiller les releases de `fhir2.base.template` et du publisher IG. Quand le upstream fixe ce comportement, supprimer ces deux overrides.

**Références** :
- [`HL7/ig-template-base2/scripts/ant.xml`](https://github.com/HL7/ig-template-base2/blob/main/scripts/ant.xml) lignes 134-170 (code commenté)
- [`HL7/ig-template-base2/includes/template-page.html`](https://github.com/HL7/ig-template-base2/blob/main/includes/template-page.html)
