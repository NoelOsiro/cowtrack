// Loader.js
const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black" data-testid="loader-container">
      <div 
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" 
        data-testid="spinner"
      ></div>
    </div>
  );
};

export default Loader;
