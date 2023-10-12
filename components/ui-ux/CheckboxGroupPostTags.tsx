const CheckboxGroupPostTags = () => {
  const postTagsOptions = [
    { value: "javascript", display: "Javascript" },
    {
      value: "typescript",
      display: "Typescript",
    },
    {
      value: "shell-script",
      display: "Shell Script",
    },
    {
      value: "css",
      display: "CSS",
    },
    {
      value: "scss",
      display: "SCSS",
    },
  ];

  return (
    <fieldset>
      <legend className="sr-only">Filter by Post Tags</legend>
      <div className="space-y-3">
        {postTagsOptions.map((option) => (
          <div key={option.value} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="post-tags-checkbox"
                aria-describedby="jobtype-checkbox-description"
                name="jobtype-checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                value={option.value}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="jobtype-checkbox"
                className="text-xs font-semibold leading-6 text-gray-400"
              >
                {option.display}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroupPostTags;
