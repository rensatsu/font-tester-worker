#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

echo "Printing env:"
printenv;

echo "Writing constants.js"
cat <<<EOT
const GFONTS_API_KEY = '${GFONTS_API_KEY}';
const GFONTS_REFERRER = '${GFONTS_REFERRER}';
const GIST_ID = '${GIST_ID}';

module.exports = {
  GFONTS_API_KEY,
  GFONTS_REFERRER,
  GIST_ID,
};
EOT >> constants.js

echo "Completed"
