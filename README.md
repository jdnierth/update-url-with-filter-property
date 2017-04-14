# update-url-with-filter-property
Checking filters and updating URL dependently without page refresh

# Description
This code consists of a form that contains multipe fieldsets. Each 
fieldset is filled with a filter category (e.g. color type, hair color)
and a set of various filter properties.
Anytime any checkbox of those filters will be clicked, a filter object
will be updated with the selected filters, then transformed into a 
valid string that finally will be attached to the url as query parameters.


# Example filter object
```
{
  "color-type": [
    "shiny-color",
    "permanent-color"
  ],
  "hair-color": [
    "blonde",
    "black"
  ]

}
```

# Example filter object query parameters
```http://localhost/?color-type=shiny-color,permanent-color&hair-color=blonde,black```

# Features
- Through usage of `window.history.pushState` making sure the back button works