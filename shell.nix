{ pkgs ? import <nixpkgs> {} }:

let
  unstable = import (fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz";
    sha256 = "sha256:1cnb74cr9zz88430xy1m9f7dxyx6237qwpljnqy62m6xjx264r9b";
  }) {
    inherit (pkgs) system;
    config = pkgs.config;
  };
in pkgs.mkShell {
  buildInputs = with pkgs; [
    unstable.deno
    lazygit
    nodejs_22
    tmux
    xclip
  ];

  shellHook = ''
    echo "🚀 Starting development environment..."
    export COMPOSE_PROJECT_NAME="irf"
  '';
}
