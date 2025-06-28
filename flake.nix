{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05";
  };

  outputs = { self, nixpkgs }:
    let 
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };

    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.zsh
          pkgs.nodejs_22
        ];

        shellHook = ''
          echo "Entorno de node 22 listo"

          if [ -n "$ZSH_VERSION" ]; then
            echo "Zsh detectado, usando"
          else
            echo "Forzando Zsh..."
            exec zsh
          fi
        '';
      };
    };
}
