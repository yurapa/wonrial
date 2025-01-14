export function TopBanner() {
  return (
    <div className="z-[100] hidden h-[40px] w-full flex-col items-center justify-center bg-gray-100 py-2 text-base dark:bg-gray-700 sm:flex-row sm:py-0 md:text-lg lg:flex">
      <div className="hidden sm:block">Support Ukraine &#127482;&#127462;</div>
      <a
        href="https://opensource.fb.com/support-ukraine"
        target="_blank"
        rel="noopener"
        className="text-link dark:text-link-dark ms-0 hover:underline sm:ms-1"
      >
        <div className="inline sm:hidden">&#127482;&#127462;</div>
        Help Provide Humanitarian Aid to Ukraine<span className="hidden sm:inline">.</span>
      </a>
    </div>
  );
}
