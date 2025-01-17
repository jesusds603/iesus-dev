import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { Distribution } from "./constants";
import { useLanguage } from "@/hooks/useLanguage";

interface DescriptionProps {
  distribution: Distribution;
}

const Descriptions: React.FC<DescriptionProps> = ({ distribution }) => {
  const { myLanguage } = useLanguage();

  if (distribution === "Bernoulli") {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          {myLanguage === "eng" ? "Description" : "Descripción"}
        </h1>
        <div className="mt-2 text-lg">
          {myLanguage === "eng" ? (
            <>
              A <span className="font-bold">Bernoulli trial</span> is a random
              experiment with only two possible outcomes, generically called{" "}
              <span className="italic">success</span> and{" "}
              <span className="italic">failure</span>, with respective
              probabilities <InlineMath math="p ~ \text{and} ~ 1-p" />. The
              random variable <InlineMath math="X" /> is defined as the function
              that maps the success outcome to 1 and the failure outcome to 0.
              Then, <InlineMath math="X" /> is said to follow a Bernoulli
              distribution with parameter <InlineMath math="p\in (0,1)" />. This
              is written as <InlineMath math="X \sim \text{Ber}(p)" />, and its
              probability function is:
            </>
          ) : (
            <>
              Un <span className="font-bold">ensayo Bernoulli</span> es un
              experimento aleatorio con únicamente dos posibles resultados
              llamados genéricamente <span className="italic">éxito</span> y{" "}
              <span className="italic">fracaso</span>, y con probabilidades
              respectivas <InlineMath math="p ~ \text{y} ~ 1-p" />. Se define la
              variable aleatoria <InlineMath math="X" /> como aquella función
              que lleva el resultado éxito al número 1, y el resultado fracaso
              al número 0. Entonces se dice que <InlineMath math="X" /> tiene
              una distribución Bernoulli con parámetro{" "}
              <InlineMath math="p\in (0,1)" />. Se escribe{" "}
              <InlineMath math="X \sim \text{Ber}(p)" /> y la correspondiente
              función de probabilidad es:
            </>
          )}
          <BlockMath math="f(x) = \left\{ \begin{align*} 1-p & \hspace{0.5cm} \text{if} & x=0 \\ p & \hspace{0.5cm} \text{if} & x=1 \\ 0 & \hspace{0.5cm} \text{otherwise} \end{align*} \right." />
        </div>
      </div>
    );
  }

  if (distribution === "Binomial") {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          {myLanguage === "eng"
            ? "Binomial Probability Function"
            : "Función de Probabilidad Binomial"}
        </h1>
        <div className="mt-2 text-lg">
          {myLanguage === "eng" ? (
            <>
              Suppose we perform <InlineMath math=" n " /> Bernoulli trials,
              where the probability of success in each trial is{" "}
              <InlineMath math=" p\in (0,1) " />. We can define the random
              variable <InlineMath math=" X " /> as the number of successes
              obtained in the <InlineMath math=" n " /> trials. The sample space
              of this experiment will consist of all sequences of length{" "}
              <InlineMath math=" n " /> of successes and failures, and therefore
              its cardinality will be <InlineMath math=" 2^n " />. The values
              that <InlineMath math=" X " /> can take are{" "}
              <InlineMath math=" 0,1,\cdots,n " />, and it is said that{" "}
              <InlineMath math=" X " /> follows a binomial distribution with
              parameters <InlineMath math=" n " /> and <InlineMath math=" p " />
              . This is written as <InlineMath math=" X \sim \text{bin}(n,p)" />
              , and its probability function is:
              <BlockMath
                math=" f(x) = \left\{ \begin{align*} 
                \binom{n}{x} p^x (1-p)^{n-x} & \hspace{1cm} \text{ if }~~ x = 0, 1, \dots, n \\
                0 & \hspace{1cm} \text{otherwise}
                \end{align*}  \right."
              />
            </>
          ) : (
            <>
              Si suponemos que se realizan <InlineMath math=" n " /> ensayos
              Bernoulli, donde la probabilidad de éxito de cada uno de ellos es{" "}
              <InlineMath math=" p\in (0,1) " />, podemos definir la variable
              aleatoria <InlineMath math=" X " /> como el número de éxitos
              obtenidos en los <InlineMath math=" n " /> ensayos. El espacio
              muestral de este experimento consistirá de todas las sucesiones de
              longitud <InlineMath math=" n " /> de éxitos y fracasos y por
              tanto su cardinalidad será de <InlineMath math=" 2^n " />. Los
              valores que puede tomar <InlineMath math=" X " /> son{" "}
              <InlineMath math=" 0,1,\cdots,n " /> y se dice que{" "}
              <InlineMath math=" X " /> tiene distribución binomial con
              parámetros <InlineMath math=" n " /> y <InlineMath math=" p " />.
              Esto se escribe como <InlineMath math=" X \sim \text{bin}(n,p)" />
              , y su función de probabilidad es:
              <BlockMath
                math=" f(x) = \left\{ \begin{align*} 
                \binom{n}{x} p^x (1-p)^{n-x} & \hspace{1cm} \text{ si }~~ x = 0, 1, \dots, n \\
                0 & \hspace{1cm} \text{otherwise}
                \end{align*}  \right."
              />
            </>
          )}
        </div>

        <div className="mt-2 text-lg">
          {myLanguage === "eng" ? (
            <>
              where <InlineMath math="\binom{n}{x} = \frac{n!}{x!(n-x)!}" /> is
              the binomial coefficient.
            </>
          ) : (
            <>
              donde <InlineMath math="\binom{n}{x} = \frac{n!}{x!(n-x)!}" /> es
              el coeficiente binomial.
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Descriptions;
