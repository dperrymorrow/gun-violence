require "json"
require "csv"

namespace :convert do
  desc "Generate JSON from the CSV file"
  task :to_json do
    csv_file  = File.read("data/stats.csv")
    json_file = File.open "data/stats.json", "w"
    data      = CSV.parse(csv_file)

    # puts JSON.parse(data.to_json)
    # keys = data.first
    # data.each_with_index do |data_index, row|
    #   hash = {}
    #   row.each_with_index do |index, value|
    #     hash[keys[index]] = value
    #   end
    #   data[data_index] = hash
    # end

    json_file.write JSON.pretty_generate(data)
    puts "converted stats from CSV to JSON format"
  end
end
