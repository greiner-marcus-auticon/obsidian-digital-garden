# Specify the source for Ruby gems
source "https://rubygems.org"

# Windows and JRuby do not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library if the platform matches Windows or JRuby.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 2.0.6" # Time zone library for Ruby
  gem "tzinfo-data" # Time zone data library
end

# Core dependencies for Jekyll
gem "jekyll", "~> 4.3.3" # Jekyll static site generator
gem "minima", "~> 2.5.1" # Default theme for Jekyll. You may change this to any theme you prefer.

# Grouping gems under :jekyll_plugins to manage Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-sitemap" # Generates a sitemap for your Jekyll site
  gem "jekyll-feed", "~> 0.17.0" # Adds RSS feed support to your Jekyll site
  gem "jekyll-tidy" # Cleans up HTML output
  gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform? # Performance booster for watching directories on Windows
  gem "kramdown-math-katex" # Renders math equations using KaTeX
  gem "webrick", "~> 1.8.1" # Provides a web server for local Jekyll development
end
