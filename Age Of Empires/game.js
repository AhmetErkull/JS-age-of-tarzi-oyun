class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
       // this.load.spritesheet('tiles', './assets/landscape.png', { frameWidth: 132, frameHeight: 132 });
       this.load.image('grass-tile','./assets/grass-tile.png',132,100);
       this.load.image('sea-tile','./assets/sea-tile.png',132,100);
        
    }

    create ()
    {
       
       // this.add.sprite(110,110,'tiles');
       //this.add.image(132,99,'grass-tile');
       //let spriteX = 35;
       //let spriteY = 25;
       let spriteX = 60
       let spriteY = 40;
       let sprite;
       const sea = 'sea-tile';
       const grass = 'grass-tile';
       for(let i = 0; i<20;i++)
       {
        for(let j = 0; j<13;j++)
        {
            if(i===0||i===1||i===19)
            {
                sprite = this.add.tileSprite(65*j  ,32*i,132,100,sea);
            }
            else
            {
                if(j===0||j===12)
                {
                    sprite = this.add.tileSprite(65*j  ,32*i,132,100,sea);
                }
                else
                {
                    sprite = this.add.tileSprite(65*j  ,32*i,132,100,grass);
                }
                
            }
            
            sprite.setScale(0.5,0.5);
        }
        for(let k = 0; k<13;k++)
        {
            if(i===0)
            {
                sprite = this.add.tileSprite(33+65*k  ,16+32*i,132,100,sea);
            }
            else
            {
                if(k===0||k===12)
                {
                    sprite = this.add.tileSprite(33+65*k  ,16+32*i,132,100,sea);
                }
                else
                {
                    sprite = this.add.tileSprite(33+65*k  ,16+32*i,132,100,grass);
                }
                
                
            }
            
            sprite.setScale(0.5,0.5);
        }
      
       }

     /*  const sprite1 = this.add.tileSprite(spriteX+0,spriteY+0,132,100,'grass-tile');
       const sprite2 = this.add.tileSprite(spriteX+66,spriteY+0,132,100,'grass-tile');
       const sprite3 = this.add.tileSprite(spriteX+33,spriteY+16,132,100,'grass-tile');
       sprite1.setScale(0.5,0.5);
       sprite2.setScale(0.5,0.5);
       sprite3.setScale(0.5,0.5);*/
       


    
    }

    

    
}

const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#0d0d0d',
    scene: Example,
};

const game = new Phaser.Game(config);


