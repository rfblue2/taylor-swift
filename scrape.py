'''
Roland Fong
6/24/17
Scrapes lyrics from Metrolyrics.com, and then outputs them into text files.
Specifically scrapes Taylor Swift lyrics ;) ;)
'''
import requests
import re
import os
import codecs
from bs4 import BeautifulSoup

print 'Init Scraper'
f = open('taylor_swift_songs.txt', 'r')

output_dir = 'dist/lyrics/'

songtitles = f.read().splitlines()

print 'Loaded Songs: '
for title in songtitles:
  print '\t' + title

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print 'URLS: '
for title in songtitles:
  trimmedTitle = title.replace(' ', '-').lower()
  trimmedTitle = re.sub(r"[?()']", '', trimmedTitle)
  url = 'http://metrolyrics.com/' + trimmedTitle + '-lyrics-taylor-swift.html'
  print '\t' + url

  html = requests.get(url).content
  soup = BeautifulSoup(html, "lxml")

  lyricshtml = soup.find(id="lyrics-body-text")
  if lyricshtml == None:
    print "cannot find lyrics for " + title
  else:
    outf = codecs.open(output_dir + trimmedTitle + '.txt', 'w', 'utf-8')
    for line in soup.find_all("p", class_="verse"):
	outf.write(line.get_text())
	outf.write("\n\n")
    outf.close()

print 'Done.'
