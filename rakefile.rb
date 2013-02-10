require "json"
require "csv"

namespace :convert do
  desc "Generate JSON from the CSV file"
  task :to_json do
    csv_file  = File.read("data/stats.csv")
    json_file = File.open "data/stats.json", "w"
    json_min  = File.open "data/stats.min.json", "w"
    data      = CSV.parse(csv_file)

    json_file.write JSON.pretty_generate(data)
    json_min.write data.to_json
    puts "converted stats from CSV to JSON format"
  end
end
