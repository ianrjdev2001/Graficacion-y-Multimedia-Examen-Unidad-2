function setup() 
{
  createCanvas(windowWidth, windowHeight);
}

function draw() 
{
  background(255,255,255);
  stroke(14,110,150); 
  
  //<=============Tamaño de las Pizzas=============>
  let r = 150;
  //<=============Posicion Pizza 1=============>
  let x = 350;
  let y = 300;
  drawCircle(x, y, r);
  //<=============Posicion Pizza 2=============>
  let x2 = 680;
  let y2 = 300;
  drawCircle(x2, y2, r);
  //<=============Posicion Pizza 3=============>
  let x3 = 1010;
  let y3 = 300;
  drawCircle(x3, y3, r);

  //<=============Partes de las Pizzas=============>
  let num_parts = parseInt(document.getElementById("parts").value);
  let ag_circle = TWO_PI / num_parts;
  
  //<=============Punto pendiente=============>
  if(num_parts >= 1) 
  {
    for(let i = 0; i < num_parts; i++) 
    {
      let a = i * ag_circle - PI;

      let px = x + r * cos(a);
      let py = y + r * sin(a);

      if(px == x) 
      {
        let y0 = min(y, py);
        let y1 = max(y, py);

        for(let yi = y0; yi <= y1; yi++) 
        {
          point(x, yi);
        }
      } 
      else 
      {
        let m = (py - y) / (px - x);
        let b = y - m * x;

        if(abs(px - x) >= abs(py - y)) 
        {
          let x0 = min(x, px);
          let x1 = max(x, px);

          for(let xi = x0; xi <= x1; xi++) 
          {
            let yi = round(m * xi + b);
            point(xi, yi);
          }
        } 
        else 
        {
          let y0 = min(y, py);
          let y1 = max(y, py);

          for (let yi = y0; yi <= y1; yi++) 
          {
            let xi = round((yi - b) / m);
            point(xi, yi);
          }
        }
      }
    }

    //<=============DDA=============>
    for(let i = 0; i < num_parts; i++) 
    {
      let a = i * ag_circle - PI;

      let px = x2 + r * cos(a);
      let py = y2 + r * sin(a);

      let x0 = round(x2);
      let y0 = round(y2);
      let x1 = round(px);
      let y1 = round(py);

      let dx = x1 - x0;
      let dy = y1 - y0;

      if(dx == 0) 
      {
        let y = min(y0, y1);
        for(let yi = y; yi <= max(y0, y1); yi++) 
        {
          point(x0, yi);
        }
      } 
      else 
      {
        let m = dy / dx;
        let b = y0 - m * x0;

        if(abs(dx) >= abs(dy)) 
        {
          let x = min(x0, x1);
  
          for(let xi = x; xi <= max(x0, x1); xi++) 
          {
            let yi = round(m * xi + b);
            point(xi, yi);
          }
        } 
        else 
        {
          let y = min(y0, y1);
          for(let yi = y; yi <= max(y0, y1); yi++) 
          {
            let xi = round((yi - b) / m);
            point(xi, yi);
          }
        }
      }
    }

    //<=============Bresenham=============>
    for(let i = 0; i < num_parts; i++) 
    {
      let a = i * ag_circle - PI;

      let x0 = x3;
      let y0 = y3;
      let x1 = round(x3 + r * cos(a));
      let y1 = round(y3 + r * sin(a));

      let dx = abs(x1 - x0);
      let dy = abs(y1 - y0);
      let sx = x0 < x1 ? 1 : -1;
      let sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while(x0 != x1 || y0 != y1) 
      {
        point(x0, y0);
        let e2 = 2 * err;
        if(e2 > -dy) 
        {
          err -= dy;
          x0 += sx;
        }
        if(e2 < dx) 
        {
          err += dx;
          y0 += sy;
        }
      }
    }
  }
}

//<=============Dibujar las Pizzas=============>

function drawCircle(xc, yc, r) 
{
  let x = 0;
  let y = r;
  let p = 1 - r;  

  while(x <= y) 
  {
    point(xc + x, yc + y);
    point(xc + y, yc + x);
    point(xc + y, yc - x);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc - y, yc - x);
    point(xc - y, yc + x);
    point(xc - x, yc + y);

    if(p < 0) 
    {
      x += 1;
      p += 2 * x + 1;
    } 
    else 
    {
      x += 1;
      y -= 1;
      p += 2 * (x - y) + 1;
    }
  }
}

//<=============Validando el input de la pagina=============>

function solonumeros(e) 
{
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  numeros = " 1234567890";
  especiales = ")(/&%$#°?¿áéíóú";
  letras = "abcdefghijklmnñopqrstuvwxyz";
    
  tecla_especial = false;

  for(var i in especiales) 
  {
    if(key == especiales[i]) 
    {
      tecla_especial = true;
      break;
    }
  }
  for(var i in letras) 
  {
    if(key == letras[i]) 
    {
      tecla_especial = true;
      break;
    }
  }
  if(numeros.indexOf(tecla) == -1 && !tecla_especial)
  {
    return false;
  }
}