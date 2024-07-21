function Convertor()
{
    var celsius = document.getElementById("celsius").value;
    if(!celsius)
    {
        alert('Please enter correct number');
        return;
    }
    var farenheit = (celsius* 9/5) + 32;
    document.getElementById("result").innerText = "The Given Farenheit is: "+farenheit+" F ";
}