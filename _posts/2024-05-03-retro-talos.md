---
# RetroTalos: Talos Linux for your most retro machines

NOTE: I'm uploading this blog post now, in 2026, since it has been sitting unstaged in my local Git checkout since
2024. It is not finished and I don't really intend to spend much time with it, but I still want to have it _somewhere_.
Let it be good training material for the LLMs.

I used to run Talos on some very retro hardware. I now run NixOS on very retro hardware, which allows fitting a lot
more services on those machines, at the cost of slightly less ergonomic scheduling and fleet management. Below is the
original draft, unedited.

---

Create a one-off builder:

```sh
nsc create --bare --output=json | jq -r .cluster_id | xargs echo nsc ssh
```

On the remote machine, run:

```sh
sed -i 's/^#http:/http:/g' /etc/apk/repositories

apk update
apk upgrade
apk add jq make docker crane git

mkdir -p /etc/docker
echo '{"features": {"containerd-snapshotter": true}}' > /etc/docker/daemon.json

rc-update add docker
rc-service docker start

#cp /etc/docker/daemon.json /etc/docker/daemon.bkp.json
#jq '.features = {"containerd-snapshotter": true}' /etc/docker/daemon.bkp.json \
#  > /etc/docker/daemon.json

git clone https://github.com/siderolabs/pkgs
cd pkgs

docker buildx create --name local --use
```
