
/***************************************************************************
 *                                                       © Michael Binder  *
 *                                                                         *
 *                This file has been generated by GDev-Edit                *
 *                                                                         *
 *                                                                         *
 ***************************************************************************/


// Creating the composer (manager for scene entities);
GDev.composer = new GDev.Composer();

// GDev Properties
GDev.Properties.AppTitle='GDevApp';
GDev.Properties.CanvasWidth=800;
GDev.Properties.CanvasHeight=600;
GDev.Properties.ClsColor.r=0;
GDev.Properties.ClsColor.g=0;
GDev.Properties.ClsColor.b=0;

// Create the start scene entity
var scene1 = new GDev.ECS.Entity('scene1');
scene1.addComponent(new GDev.ECS.Components.Scene(true));
GDev.composer.addScene(scene1);

// Create an entity
var entity1 = new GDev.ECS.Entity('entity1');
entity1.addComponent(new GDev.ECS.Components.Transform(200,200,0,1,1));
entity1.addComponent(new GDev.ECS.Components.Sprite('media/ship.png',true,true,2,2));
entity1.addComponent(new GDev.ECS.Components.MouseListener());
entity1.addComponent(new GDev.ECS.Components.Script(`

				// The user can define variables and functions,
				// however, these are created in script context,
				// so they have to be referred with the keyword 'this'.
				// See: onDelete()
				
				// A variable
				myName: self.name,
				
				// A Function
				myFunc(val)
				{
					console.log(val);
				},
	
				// The following three "on"- functions have to be defined in every script,
				// even if they are empty.

				onCreate()
				{
					// Here goes code that should be executed
					// at the creation of the entity.
					console.log(this.myName+" has been created");
				},

				onTick()
				{
					self.components.Sprite.currentFrame +=1;
					if(self.components.Sprite.currentFrame > self.components.Sprite.cellCount)
					{
						self.components.Sprite.currentFrame = 0;
					}


					// Here goes code that should be executed every game tick.

					// To access the entity this script is attached to,
					// simply use the keyword "self"
					self.components.Transform.x +=1;
					if(self.components.Transform.x > GDev.CanvasWidth)
					{
						GDev.composer.deleteEntity(GDev.composer.thisScene, self);
                    	GDev.composer.goToScene("scene2");
					}
				},
				
				onDelete()
				{
					// Here goes code that should be executed
					// at the deletion of the entity.
					this.myFunc(this.myName + " has been deleted");
				}

`));
// Add entity to scene
GDev.composer.addEntityToScene(scene1,entity1);

// Create a scene entity
var scene2 = new GDev.ECS.Entity('scene2');
scene2.addComponent(new GDev.ECS.Components.Scene(false));
GDev.composer.addScene(scene2);

// Create an entity
var entity2 = new GDev.ECS.Entity('entity2');
entity2.addComponent(new GDev.ECS.Components.Transform(200,200,0,1,1));
entity2.addComponent(new GDev.ECS.Components.Text('Scene2',true,0,0));
// Add entity to scene
GDev.composer.addEntityToScene(scene2,entity2);

// Attach scripts to entites
GDev.composer.attachScripts();
// Set start scene
GDev.composer.setStartScene();

// Initialize the graphics context
Graphics(GDev.Properties.CanvasWidth, GDev.Properties.CanvasHeight, GDev.Properties.AppTitle);
ClsColor(GDev.Properties.ClsColor.r, GDev.Properties.ClsColor.g, GDev.Properties.ClsColor.b);
TFormFilter(false);

//GDev.Serialize(GDev.composer);

// Load all sprites
GDev.composer.loadSprites();

// Main function
window[GDev.Properties.AppTitle] = function()
{
	Cls();
	GDev.Update();
	GDev.composer.invokeOnTick();
}
