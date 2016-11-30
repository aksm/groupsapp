describe grootsCal do
  before do
    ics   = File.join(File.dirname(__FILE__), 'local_copy.ics')
    @grootsCal = grootsCal.new(ics)
  end

  it "should find upcoming events" do
    @grootsCal.upcoming_groupEvents.all? { |groupEvent| groupEvent.dtstart.should > DateTime.now }
  end
end