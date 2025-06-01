import random
import json
from datetime import datetime, timedelta

def generate_exchange_data(start_date, end_date):
    data = {"success": True, "source": "usd", "quotes": {}}
    
    
    current_date = datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.strptime(end_date, "%Y-%m-%d")
    
    while current_date <= end_date:
       
        random_value = round(random.uniform(80.0, 86.0), 2)
        
        # Add the generated value to the 'quotes' dictionary
        data["quotes"][current_date.strftime("%Y-%m-%d")] = {"USDINR": random_value}
        
        # Move to the next day
        current_date += timedelta(days=1)
    
    return data

# Usage
start_date = "2023-01-01"
end_date = "2024-01-31"
exchange_data = generate_exchange_data(start_date, end_date)

# Writing the generated data to 'exchangedata.json' file
with open('Exchangerate.json', 'w') as json_file:
    json.dump(exchange_data, json_file, indent=4)

print('hello')