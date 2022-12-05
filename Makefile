install:
	npm ci

build:
	rm -rf build
	npx tsc
	npx copyfiles --up 1 --all ./day/**/input.txt build/day

run:
	node build/day/$(day)

create:
	mkdir day/${day}
	touch day/${day}/index.ts day/${day}/input.txt day/${day}/README.md

debug:
	rm -rf debug
	mkdir debug
	npx tsc --module node16 --outDir debug day/$(day)/index.ts
	cp ./day/$(day)/input.txt ./debug/day/$(day)
	node debug/day/$(day)
	rm -rf debug

.PHONY: build run create debug