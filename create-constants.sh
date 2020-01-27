#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

echo "Writing constants.js"
if [ -f "constants.js" ]; then
    >&2 echo "Constats file already exists"
    exit 1;
fi;

cat <<EOT  > constants.js
const GFONTS_API_KEY = '${GFONTS_API_KEY:-}';
const GFONTS_REFERRER = '${GFONTS_REFERRER:-}';
const GIST_ID = '${GIST_ID:-}';
const GIT_COMMIT = '${GITHUB_SHA:-}';

module.exports = {
  GFONTS_API_KEY,
  GFONTS_REFERRER,
  GIST_ID,
  GIT_COMMIT,
};
EOT

echo "Completed"
