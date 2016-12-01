@client.execute(api_method: @service.freebusy.query, 
  body: JSON.dump({timeMin: start_time,
  timeMax: end_time,
  timeZone: "EST",
  items: [calendar_id]}),
  headers: {'Content-Type' => 'application/json'})
