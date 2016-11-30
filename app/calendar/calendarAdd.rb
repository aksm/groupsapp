selector = HTML::Selector.new "input[type=text]"
selectedCalendar = selector.select()

require 'googlecalendar'
g = GData.new
token = g.login(user_email, user_password)
event = { :title     => eventTitle,
          :content   => eventDesc,
          :author    => eventAdmin,
          :email     => user_email,
          :where     => eventLocation,
          :startTime => eventStartDate,
          :endTime   => eventEndDate}
g.new_event(event, selectedCalendar)