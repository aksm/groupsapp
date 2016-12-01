def make_google_calendar_reservations  
  @schedule = @cohort.schedules.find_by(slug:  
    params[:slug])
  @calendar = GoogleCalWrapper.new(current_user)
  @calendar.book_rooms(@schedule)
end  
