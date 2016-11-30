require 'googlecalendar'
require 'googlecalendar_builders'
data = scan '/calendar/ical/french@holiday.calendar.google.com/public/basic'
calendar = parse data
html calendar, 'output/results.html'