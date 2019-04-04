#!/bin/bash
for file in $(grep -l -R setExpandEntityReferences *); do {
	if ! grep -q "http://xml.org/sax/features/external-parameter-entities" $file; then
		grep -L "http://apache.org/xml/features/disallow-doctype-decl" $file
	fi
}
done

# add your script above ^

# *** DO NOT DELETE BELOW ***
# this file must end with 'true' to return as the program expects
true