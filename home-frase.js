jQuery(document).ready(function($) {
	var $svgAnimado = $(".texto-animado");
	var nPalavras = $svgAnimado.children().length - 1;
	var iPalavraAtual = 0;

	var tempoEscrita = 800;
	var tempoApaga = 300;
	var tempoDelay = 800;
	

	var animarPalavra = function(){
		var $palavraAtual = $svgAnimado.children("g").eq(iPalavraAtual);
		var $partes = $palavraAtual.children("path");
		var nPartes = $partes.length - 1;
		var iParteAtual = 0;

		var lengthsPartes = [];
		var lengthTotal = 0;

		console.log(lengthsPartes);

		$partes.each(function(index, el) {
			lengthsPartes.push(Math.ceil($(el)[0].getTotalLength()));
			lengthTotal += Math.ceil($(el)[0].getTotalLength());
		});
		// lengthTotal = lengthTotal + 1;

		var lengthsAcumulados = 0;

		$palavraAtual
		.prop('lengthPath', 0)
		.animate(
			{lengthPath: lengthTotal}, 
			{
				duration: tempoEscrita,
				// easing: "linear",
				step: function(now){
					// console.log(now);
					if (now > lengthsAcumulados + lengthsPartes[iParteAtual]){
						lengthsAcumulados += lengthsPartes[iParteAtual];
						$partes.eq(iParteAtual).css("stroke-dashoffset", "0");
						if (iParteAtual < nPartes){
							iParteAtual++;
						} else{
							// console.warn()
						}
					}

					// console.log("IDA: animando parte "+iParteAtual);

					var offsetCalculado = 100-((now - lengthsAcumulados)/lengthsPartes[iParteAtual]*100);
					// console.log(offsetCalculado);
					$partes.eq(iParteAtual).css('stroke-dashoffset', offsetCalculado); 
				},
				complete: function(){
					$partes.css("stroke-dashoffset", "0");
					lengthsAcumulados = lengthTotal;
				}
			}
		)
		.delay(tempoDelay)
		.animate(
			{lengthPath: 0}, 
			{
				duration: tempoApaga,
				// easing: "linear",
				step: function(now){
					// console.log({
					// 	now: now,
					// 	acumulado: lengthsAcumulados,
					// 	atual: iParteAtual,
					// 	lengthAtual: lengthsPartes[iParteAtual],
					// });
					if (now < lengthsAcumulados - lengthsPartes[iParteAtual]){
						lengthsAcumulados -= lengthsPartes[iParteAtual];
						$partes.eq(iParteAtual).css("stroke-dashoffset", "100");
						if (iParteAtual > 0){
							iParteAtual--;
						}
					}

					// console.log("VOLTA: animando parte "+iParteAtual);

					var offsetCalculado =  (( lengthsAcumulados - now)/lengthsPartes[iParteAtual]*100);
					console.log(offsetCalculado);
					$partes.eq(iParteAtual).css('stroke-dashoffset', offsetCalculado); 
				},
				complete: function(){
					$partes.css("stroke-dashoffset", "100");
					iPalavraAtual = iPalavraAtual === nPalavras ? 0 : iPalavraAtual + 1;
					animarPalavra();
				}
			}
		)
		
	}

	animarPalavra();
});