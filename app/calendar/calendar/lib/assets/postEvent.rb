@client.execute(:api_method => @service.events.insert,
  :parameters => {'calendarId' => calendar_id,
    'sendNotifications' => true},
  :body => JSON.dump(event),
  :headers => {'Content-Type' => 'application/json'})
