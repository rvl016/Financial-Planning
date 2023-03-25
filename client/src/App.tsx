import './assets/primereactTheme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useAppSelector } from './core/hooks';
import { shallowEqual } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { selector } from './features/bankStatement/bankStatementSlice';
import { Sidebar } from 'primereact/sidebar';        
import { PanelMenu } from 'primereact/panelmenu';        
import { useState } from 'react';
import { MenuItem } from 'primereact/menuitem';
        

function App() {
  useAppSelector(s => s.bankStatements, shallowEqual); // Eq == para o primeiro nível de objetos
  useAppSelector(selector); // Eq == para o primeiro nível de objetos

  const [isOpen, setOpen] = useState(true)
  const [currentMenu, setCurrentMenu] = useState(Menu.HOME);

  return (
    <Sidebar visible={isOpen} onHide={() => setOpen(false)}>
      <PanelMenu
        model={menus}
      ></PanelMenu>
    </Sidebar>
  );
}

export default App;


enum Menu {
  HOME = "Home"
}

const menus: MenuItem[] = [
  {
    id: String(1),
    label: Menu.HOME,
    icon: <></>,
    template: (item, options) => {
      return <></>;
    }
  }
]


