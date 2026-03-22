export default function CurrencySelector() {
  return (
    <div className="flex items-center gap-2">
      <label className="font-medium text-[rgb(25,52,85)]">Currency</label>
      <select className="text-center rounded-lg py-1 border-2 focus:border-[rgb(25,52,85)]">
        <option>Peso Argentino (ARS)</option>
        <option>Real Brasilero (BRL)</option>
        <option>Peso Chileno (CLP)</option>
        <option>Dolar Estadounidense (USD)</option>
        <option>Euro (EUR)</option>
      </select>
    </div>
  );
}
