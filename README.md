Hi,

Thank you for entering and welcome to my solution.

First thing, in order to run the app you'll going to need to add `--experimental-json-modules` to your running command.

For example, the simple running command will be `node --experimental-json-modules app.js`.

The reason for this is that I've used an experimental json modules in order to parse the json file, it just did the work much more better then any other method and by far the most elegant solution I've found.

### Some documentation:
all parameters are query parameters, here are some examples:

    localhost:3001/?average_age_operator=smaller&average_age=26&address=Los Angeles, California, USA&distance=10800&sort_by=distance_km&sort_order=desc
    
    localhost:3001/?average_age=20&average_age_operator=smaller&avg_income=70000&avg_income_operator=bigger&dist_from_center_op=range&dist_from_center_min=10&dist_from_center_max=50
    
    localhost:3001/?dist_from_center_op=bigger&dist_from_center=25&average_age_operator=range&average_age_min=26&average_age_max=30&avg_income_operator=range&avg_income_min=30000&avg_income_max=50000&sort_by=average_age&sort_order=desc

    localhost:3001/?average_age=50&average_age_operator=bigger&avg_income=95000&avg_income_operator=bigger&dist_from_center=18&dist_from_center_op=smaller

range parameter are not required if you use the value parameter, the opposite.

string parameters are able to filter only by equal
    
    average_age = number
    average_age_operator = 'bigger' | 'smaller' | 'equal' | 'range'
    average_age_min = number
    average_age_max = number
    

    dist_from_center = number
    dist_from_center_op = 'bigger' | 'smaller' | 'equal' | 'range'
    dist_from_center_min = number
    dist_from_center_max = number
    
    avg_income = number
    avg_income_operator = 'bigger' | 'smaller' | 'equal' | 'range'
    avg_income_min = number
    avg_income_max = number

    pub_transport_avail = string - 'low' | 'high' | 'none' | ...
    
    address = string
    distance = number - number of km within the address specified above
    
    sort_by = string <field>
    sort_order = desc - if other value or none will provided, it will sort asc
    

### Conclusions:
I really enjoyed developing this small app.

some weaknesses:

I would sure set up the calculation distance function a little different so it will be faster.

The way I implemented the url query params is not perfect, what came up to my mind is that the route address is simple. the url might become complicated, but I wanted the parameters to have a really clear and understandable names, probably could've come up with a better and more solution.

Probably could've come up with a better soultion if I had more time.

Thanks for all and cheers,

Yaron.
