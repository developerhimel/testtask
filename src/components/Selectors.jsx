import { TreeSelect } from "antd";

const Selectors = ({ selectors, value, setValue }) => {
  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="sectors" className="font-semibold text-gray-600">
        Sectors
      </label>
      <TreeSelect
        id="sectors"
        showSearch
        style={{
          width: "100%",
        }}
        value={value}
        dropdownStyle={{
          maxHeight: 800,
          overflow: "auto",
        }}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={onChange}
        treeData={selectors}
        size="large"
      />
    </div>
  );
};
export default Selectors;
