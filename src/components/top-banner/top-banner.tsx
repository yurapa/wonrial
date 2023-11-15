export function TopBanner() {
  return (
    <div className="h-[40px] hidden lg:flex w-full bg-gray-100 dark:bg-gray-700 text-base md:text-lg py-2 sm:py-0 items-center justify-center flex-col sm:flex-row z-[100]">
      <div className="hidden sm:block">Support Ukraine &#127482;&#127462;</div>
      <a
        href="https://opensource.fb.com/support-ukraine"
        target="_blank"
        rel="noopener"
        className="ms-0 sm:ms-1 text-link dark:text-link-dark hover:underline"
      >
        <div className="inline sm:hidden">&#127482;&#127462;</div>
        Help Provide Humanitarian Aid to Ukraine<span className="hidden sm:inline">.</span>
      </a>
    </div>
  );
}
