#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

echo "Writing constants.js"
if [ -f "constants.js" ]; then
    >&2 echo "Constants file already exists"
    exit 1;
fi;

cat <<EOT  > constants.js
const GFONTS_API_KEY = '${GFONTS_API_KEY:-}';
const GFONTS_REFERRER = '${GFONTS_REFERRER:-}';
const GIT_COMMIT = '${GITHUB_SHA:-}';

module.exports = {
  GFONTS_API_KEY,
  GFONTS_REFERRER,
  GIT_COMMIT,
};
EOT

echo "Completed"
