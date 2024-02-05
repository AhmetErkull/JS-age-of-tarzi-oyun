var game = new Phaser.Game(800, 600, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, buildingGroup,  cursorPos, cursor;
let i =0;

BasicGame.Boot.prototype =
{
    
    preload: function () {
        game.load.image('tile', './assets/grass-tile.png');
        game.load.image('building', './assets/buildingTile.png');
       
        game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

       
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.2);
        game.input.onDown.add(()=>
        {
            isoGroup.forEach(function (tile) {
               
               var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
                // If it does, do a little animation and tint change.
                if ( inBounds && !tile.hasBuilding) {
                    building = game.add.isoSprite(tile.isoBounds.x, tile.isoBounds.y, i*100, 'building', 0, buildingGroup);
                    building.anchor.set(0.5, 0.5);
                    tile.hasBuilding = true;
                    
                }
            
                game.iso.simpleSort(buildingGroup);
            });
        
        });

    },
    create: function () {
      
    

        this.add.image(0,0,'building');
        // Create a group for our tiles.
        isoGroup = game.add.group();
        buildingGroup = game.add.group();

        // Let's make a load of tiles on a grid.
        this.spawnTiles();

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();
    },
    update: function () {


        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 0x86bfda;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
        });
    },

    spawnTiles: function () {
        var tile;
        for (var xx = 0; xx < 250; xx += 71) {
            for (var yy = 0; yy < 250; yy += 71) {
                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                tile.anchor.set(0.5, 0);
            }
        }
        

      //  building = game.add.isoSprite(71, 71, 1, 'building', 0, isoGroup);
       // building.anchor.set(0.5, 0);
       // building.scale.setTo(0.5,0.5);
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

























/*class Example extends Phaser.Scene
{

    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('tiles', 'assets/tilesheet.png');
    }

    create ()
    {
        const mapData = new Phaser.Tilemaps.MapData({
            width: 111,
            height: 128,
            tileWidth: 111,
            tileHeight: 64,
            orientation: Phaser.Tilemaps.Orientation.ISOMETRIC,
            format: Phaser.Tilemaps.Formats.ARRAY_2D
        });

        const map = new Phaser.Tilemaps.Tilemap(this, mapData);

        const tileset = map.addTilesetImage('iso-64x64-outside', 'tiles',111,128);

        const layer = map.createBlankLayer('layer', tileset, 600, 200);

        const data = [
            [ 10, 11, 12, 13, 14, 15, 16, 10, 11, 12 ],
            [ 13, 11, 10, 12, 12, 15, 16, 10, 16, 10 ],
            [ 12, 10, 16, 13, 14, 15, 16, 16, 13, 12 ],
            [ 10, 11, 12, 13, 14, 15, 16, 10, 11, 12 ],
            [ 13, 11, 10, 12, 12, 15, 16, 10, 16, 10 ],
            [ 12, 10, 16, 13, 14, 15, 16, 16, 13, 12 ],
            [ 10, 11, 12, 13, 14, 15, 16, 10, 11, 12 ],
            [ 13, 11, 10, 12, 12, 15, 16, 10, 16, 10 ],
            [ 12, 10, 16, 13, 14, 15, 16, 16, 13, 12 ],
            [ 10, 11, 12, 13, 14, 15, 16, 10, 11, 12 ]
        ];

        let y = 0;

        data.forEach(row => {

            row.forEach((tile, x) => {

                layer.putTileAt(tile, x, y);

            });

            y++;

        });
        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
          camera: this.cameras.main,
          left: cursors.left,
          right: cursors.right,
          down: cursors.down,
          up: cursors.up,
          speed: 0.5
      };
  


      this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

      this.cameras.main.setBounds(0, 0, layer.x + layer.width + 600, layer.y + layer.height + 800);
    }
    update (time, delta)
    {
        this.controls.update(delta);
    }

}

const config = {
    type: Phaser.AUTO,
    width: 12*111,
    height: 12*128,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    pixelArt: true,
    zoom: 0.6,
    scene: Example
};
const game = new Phaser.Game(config);
*/