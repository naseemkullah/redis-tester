# Redis-tester

`redis-tester` creates two redis clients, a publisher and subscriber and messages coninuouosly publishes to two channels on a 1s interval.

## Testing redis-sentinel

The environment variable `REDIS_SENTINEL_HOST` must be set in `deployment.yaml` to target a sentinel cluster.
Other configurable environment variables are `REDIS_SENTINEL_MASTER` which defaults to `mymaster` and `REDIS_SENTINEL_PORT` which defaults to `26379`.

There are supplied values files for the `redis` and `redis-ha` helm charts which can be used to deploy redis sentinel clusters.

## Build with Google Cloud Build

Run the following command in this directory.

```
$ gcloud builds submit . --config=cloudbuild.yaml
```
