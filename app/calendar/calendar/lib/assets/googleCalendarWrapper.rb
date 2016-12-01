# GoogleCalendarWrapper

response = @client.execute(api_method:
	@service.calendar_list.list)

def calendar_id(schedule)

	response = @client.execute(api_method:
		@service.calendar_list.list)
	calendars = JSON.parse(response.body)
	calendars = calendars["items"].select {|cal|
		cal["id"].downcase == scheudle.calendar_id}
	calendar["id"]
end
