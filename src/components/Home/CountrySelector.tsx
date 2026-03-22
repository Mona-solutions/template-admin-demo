export default function CountrySelector() {
  return (
    <div className="flex items-center gap-2">
      <label className="font-medium text-[rgb(25,52,85)] ">Country</label>
      <select className="text-center rounded-lg py-1 border-2 focus:border-[rgb(25,52,85)]">
        <option>Argentina</option>
        <option>Brasil</option>
        <option>Chile</option>
        <option>Estados Unidos</option>
        <option>España</option>
      </select>
    </div>
  );
}
