/*
This script shows you how to modify the contents of an on-screen 
UiApp. 

Use: 
1. Go to Google docs
2. Create a new Spreadsheet
3. In the Spreadsheet's menu, select Tools > ScriptEditor
4. Delete the contents of the default script you're given
5. Copy this code into the script editor
6. Save the script
7. Go back to the Spreadsheet and refresh the page
8. Wait for the 'Tutorial' menu to appear to the right of the 'Help' menu
9. Use the "Test Var Passing" option

Once you've run through this to see what it does, see if you can 
solve the following problems: 
  1. Hitting the 'original button' adds a new button every time. 
Write code to prevent duplicate buttons from appearing.
  2. When 'original button' is hit and there's already a 'new button',
make the original textArea appear again.
*/
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Test Var Passing", functionName: "varPassing"},
                      {name: "Your Function", functionName: "yourFunc"} ];
  ss.addMenu("Tutorial", menuEntries);
}

function varPassing() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var myapp = UiApp.createApplication();
  myapp.setTitle('Test UI modification');

  /*
  Set up containers.
  Horizontal panel defaults to a left-to-right layout.
  leftPanel will hold buttons.
  rightPanel will hold contents.
  */
  var mainPanel = myapp.createHorizontalPanel();
  var leftPanel = myapp.createVerticalPanel().setId('leftPanel');
  var rightPanel = myapp.createVerticalPanel().setId('rightPanel');
  rightPanel.setWidth('300').setHeight('300');
  mainPanel.add(leftPanel);
  mainPanel.add(rightPanel);
  
  var button = myapp.createButton();
  button.setText('original button');
  var handler = myapp.createServerHandler('addOtherButton');
  /*
  you want access to both leftPanel and rightPanel, so here
  we pass along their parent/owner. this allows us to access
  leftPanel and rightPanel using their ID
  */
  handler.addCallbackElement(mainPanel);
  button.addClickHandler(handler);
  leftPanel.add(button);
  
  var textArea = myapp.createTextArea().setId('mainText');
  textArea.setText("This is the text we see first. You'll have to write a function to reinstate this text.");
  //100% of the 300x300 area we set for rightPanel up above
  textArea.setWidth('100%').setHeight('100%');
  rightPanel.add(textArea);
  
  myapp.add(mainPanel);
  ss.show(myapp);
}

function addOtherButton(e){
  var myapp = UiApp.getActiveApplication();
  
  var newbutton = myapp.createButton().setText('new button');
  myapp.getElementById('leftPanel').add(newbutton);
  
  var handler = myapp.createServerHandler('clearTest');
  //pass along the parent again
  handler.addCallbackElement(myapp.getElementById('mainPanel'));
  newbutton.addClickHandler(handler);
  
  return myapp;
}

function clearTest(e){
  var myapp = UiApp.getActiveApplication();
  var tmp = myapp.getElementById('rightPanel');
  tmp.clear();
  
  var newlabel = myapp.createLabel();
  newlabel.setText('this is your new label...write stuff to get the text area back!');
  tmp.add(newlabel);
  
  return myapp;
}

function yourFunc() {
  Browser.msgBox("Hello");
}
