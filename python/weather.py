from datetime import datetime
import matplotlib.pyplot as plt
from meteostat import Point, Daily
import geocoder

# Set the duration
start = datetime(2022, 1, 1)
end = datetime(2022, 8, 31)
# Accessing your Location
g = geocoder.ip('me')
ls=list(map(int,g.latlng))
lat =ls[0]
lang=ls[1]
myloc= Point(lat,lang)

#Get data for the year
data = Daily(myloc, start, end)
data = data.fetch()

# Plot line chart including average, minimum and maximum temperature
data.plot(y=['tavg', 'tmin', 'tmax'])
plt.show()
