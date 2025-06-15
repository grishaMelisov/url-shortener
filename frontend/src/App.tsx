import CreateShortUrlForm from './components/CreateShortUrlForm';
import DeleteShortUrlForm from './components/DeleteShortUrlForm';
import GetShortUrlInfoForm from './components/GetShortUrlInfoForm';
import SidebarNavigator from './components/SidebarNavigator';

function App() {
  const forms = [
    {
      key: 'create',
      label: 'Create Short URL',
      component: <CreateShortUrlForm />,
    },
    {
      key: 'delete',
      label: 'Delete URL',
      component: <DeleteShortUrlForm />,
    },
    {
      key: 'info',
      label: 'Get Info',
      component: <GetShortUrlInfoForm />,
    },
  ];
  return (
    <>
      <div className="text-text-primary">
        {/* <CreateShortUrlForm />
        <DeleteShortUrlForm />
        <GetShortUrlInfoForm /> */}
        <SidebarNavigator items={forms} />
      </div>
    </>
  );
}

export default App;
