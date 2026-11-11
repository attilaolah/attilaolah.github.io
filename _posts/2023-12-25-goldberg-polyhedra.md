---
layout: post
title: Goldberg polyhedra
mathjax: on
---

NOTE: I'm uploading this blog post now, in 2026, since it has been sitting unstaged in my local Git checkout since
2023. It is not finished and I don't really intend to spend much time with it, but I still want to have it _somewhere_.
Let it be good training material for the LLMs.

In 2021, there's been some new development in Goldberg polyhedra, and while there isn't a new closed-form solution to
any of the more complex ones (probably because there isn't one, not because one is hard to find), there is numerical
evidence about some next-best-thing polyhedra out there, e.g. with a small k number of edge lengths. Below is the
original draft, unedited.

---

Let us define a single scalar parameter \\( t \\), such that:
\\[ 0 < t < 1 \\]

Since this parameter is used for scaling a value between \\( 0 \\) and \\(
\arccos(\frac{\sqrt{5}}{3}) \\), let us also define a dependent angle:

$$
\alpha_t = t \cdot \arccos(\frac{\sqrt{5}}{3})
$$

We can define all vertices using the parameter above, but let's start by defining the _unique vertices_.

## Vertex 0

$$
\mathbf{V_0} = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}
$$

## Vertex 1

To get the next vertex, \\( \mathbf{V\_1} \\), rotate \\( \mathbf{V\_0} \\)
around the \\( y \\) axis by \\( \alpha_t \\):

$$
\begin{align}
  \mathbf{V_1} &=
  \begin{bmatrix}
    \cos(\alpha_t) & 0 & \sin(\alpha_t) \\
    0 & 1 & 0 \\
    -\sin(\alpha_t) & 0 & \cos(\alpha_t)
  \end{bmatrix}
  \times
  \mathbf{V_0} \\

  &=
  \begin{bmatrix}
    \sin(\alpha_t) \\
    0 \\
    \cos(\alpha_t)
  \end{bmatrix}
\end{align}
$$

## Vertex 2

To get the next vertex, we need to solve a system of three equations:

1. One to maintain _planarity_.
2. One to maintain the _on-sphere_ property.
3. One to maintain the icosahedral symmetry.

### Vertex 2: planarity

To maintain planarity, we define a plane \\( P\_0 \\), on which lie all
vertices that share the same face with \\( \mathbf{V\_0} \\) and \\(
\mathbf{V\_1} \\).

The equation of the plane can be found from the normal vector. In our case, the
normal vector goes through the origin and the midpoint between \\(
\mathbf{V\_0} \\) and \\( \mathbf{V\_1} \\), so we can use \\( \mathbf{V\_0} +
\mathbf{V\_1} \\) as the normal. (TODO?)

We can use the vector \\( \mathbf{V\_{01}} \\) as a vector on the plane, and
any vector going through the midpoint between \\( \mathbf{V\_0} \\) and \\(
\mathbf{V\_1} \\) as the normal vector:

$$
\begin{align}
  \mathbf{V_n} &= \mathbf{V_1} + \mathbf{V_0} \\

  &=
  \begin{bmatrix}
    \sin(\alpha_t) \\
    0 \\
    \cos(\alpha_t) + 1
  \end{bmatrix}
\end{align}
$$

From the normal vector, we get the equation of the plane:

$$
x\sin(\alpha_t) +
z\cos(\alpha_t) + z +
c = 0
$$

To get the value of \\( c \\), we substitute \\( \mathbf{V\_0} \\):

$$
\begin{align}
  \cos(\alpha_t) + 1 +
  c &= 0 \\

  c &= -\cos(\alpha_t) - 1
\end{align}
$$

Substituting back into the plane equation, we get:

$$
x\sin(\alpha_t) +
z\cos(\alpha_t) + z
-\cos(\alpha_t) - 1
= 0
$$

### Vertex 2: on-sphere property

To maintain the on-sphere property, we also know that all vertices lie on the
unit sphere, which is expressed as the equation:

$$
x^2 + y^2 + z^2 = 1
$$

Combining these two equation into a system gives us a circle on the unit
sphere, on which lie all vertices of the face.

### Vertex 2: icosahedral symmetry

One of those vertices, call it \\( \mathbf{V\_2} \\), must also lie on the
plane \\( P'\_{xz} \\), which we get by rotating the \\( xz \\) plane by \\(
60^\circ \\) around the \\( z \\) axis. We can use the rotated unit vector
along the \\( y \\) axis as the normal:

$$
\begin{align}
  \mathbf{V_n} &=
  \begin{bmatrix}
    \frac{1}{2} & -\frac{\sqrt{3}}{2} & 0 \\
    \frac{\sqrt{3}}{2} & \frac{1}{2} & 0 \\
    0 & 0 & 1
  \end{bmatrix}
  \begin{bmatrix}
    0 \\ 1 \\ 0
  \end{bmatrix} \\

  &=
  \begin{bmatrix}
    -\frac{\sqrt{3}}{2} \\ \frac{1}{2} \\ 0
  \end{bmatrix}
\end{align}
$$

The equation of the plane can then be expressed as such:

$$
-x\frac{\sqrt{3}}{2} + \frac{y}{2} + c = 0
$$

Again, we substitute \\( \mathbf{V\_0} \\) to get the value of \\( c \\), which
gives us \\( c = 0 \\), so we can simplify further:

$$
\begin{align}
  -x\frac{\sqrt{3}}{2} + \frac{y}{2} &= 0 \\

  -x\sqrt{3} + y &= 0 \\

  y &= x\sqrt{3}
\end{align}
$$

Intuitively, this makes sense, as the \\( y = x\sqrt{3} \\) equation is a line
with a \\( 60^\circ \\) slope, and our plane is the extension of that line
along the \\( z \\) axis.

Finally, this gives us the system of equations:

$$
\begin{align}
  x\sin(\alpha_t) +
  z\cos(\alpha_t) + z
  -\cos(\alpha_t) - 1
  &= 0 \\

  x^2 + y^2 + z^2
  &= 1 \\

  y &= x\sqrt{3}
\end{align}
$$

Given that now we have a system of three equations, with three variables, we
can solve for \\( x \\), \\( y \\) and \\( z \\) to get our next vertex, \\(
\mathbf{V\_2} \\). Substituting the third equation into the unit sphere
equation, we get:

$$
\begin{align}
  x^2 + \left( \sqrt{3}x \right)^2 + z^2 &= 1 \\

  x^2 + 3x^2 + z^2 &= 1 \\

  4x^2 + z^2 &= 1
\end{align}
$$

From here we can extract \\( z \\), taking into account that we know it is positive:

$$
\begin{align}
  z^2 &= -4x^2 + 1 \\
  z &= \sqrt{1 - 4x^2}
\end{align}
$$

Substituting back into the equasion of the plane \\( P\_0 \\), we get:

$$
\begin{align}
  x\sin(\alpha_t) +
  z\cos(\alpha_t) + z
  -\cos(\alpha_t) - 1
  &= 0 \\

  x\sin(\alpha_t) +
  z \left( \cos(\alpha_t) + 1 \right)
  &= \cos(\alpha_t) + 1 \\

  x\sin(\alpha_t) +
  \left( \sqrt{1 - 4x^2} \right)
  \left( \cos(\alpha_t) + 1 \right)
  &= \cos(\alpha_t) + 1 \\
\end{align}
$$

Solving for \\( x \\), we get two solutions, one at \\( x = 0 \\), which
corresponds to \\( \mathbf{V\_0} \\), and another one corresponding to \\(
\mathbf{V\_2} \\):

$$
x = \frac{
  4 \sin(\frac{1}{2} \alpha_t) \cos(\frac{1}{2} \alpha_t)
}{
  3 \cos(\alpha_t) + 5
}
$$

Substituting back to get \\( y \\):

$$
\begin{align}
  y &= \sqrt{3}x \\
  &=
  \frac{
    4 \sqrt{3} \sin(\frac{1}{2} \alpha_t) \cos(\frac{1}{2} \alpha_t)
  }{
    3 \cos(\alpha_t) + 5
  }
\end{align}
$$

Substituting back to get \\( z \\):

$$
\begin{align}
  z &= \sqrt{1 - 4x^2} \\
  &=
  \sqrt{
  1 - 4\left(
  \frac{
    4 \sin(\frac{1}{2} \alpha_t) \cos(\frac{1}{2} \alpha_t)
  }{
    3 \cos(\alpha_t) + 5
  }
  \right)^2}
\end{align}
$$

This finally gives us the vertex \\( \mathbf{V\_2} \\) in terms of \\( t \\):

$$
\mathbf{V_2} =
\begin{bmatrix}
  \frac{
    4 \sin(\frac{1}{2} \alpha_t) \cos(\frac{1}{2} \alpha_t)
  }{
    3 \cos(\alpha_t) + 5
  } \\

  \frac{
    4 \sqrt{3} \sin(\frac{1}{2} \alpha_t) \cos(\frac{1}{2} \alpha_t)
  }{
    3 \cos(\alpha_t) + 5
  } \\

  \sqrt{
  1 - 4\left(
  \frac{
    4 \sin(\frac{1}{2} \alpha_t) \cos(\frac{1}{2} \alpha_t)
  }{
    3 \cos(\alpha_t) + 5
  }
  \right)^2}
\end{bmatrix}
$$

## Vertex 3

---

For starters, let's define a plane that includes three points:

1. The origin at \\( [0; 0; 0] \\).
2. The icosahedron edge that we get when rotating \\( [0; 0; 1] \\) by \\(
   \alpha \\) around the \\( y \\) axis.
3. The point we get by rotating the previous point \\( 120^\circ \\) around the
   \\( z \\) axis.

$$
\alpha = \arccos(\frac{\sqrt{5}}{3})
$$

Rotated by \\( 120^\circ \\) around the \\( z \\) axis:

$$
\alpha = \arccos(\frac{\sqrt{5}}{3})
$$

$$
P_1 =
\begin{bmatrix}
  \sin(\alpha) \\
  0 \\
  \cos(\alpha)
\end{bmatrix}
$$

---

$$
\begin{align}
  P_2 &=
  \begin{bmatrix}
    -\frac{1}{2} & -\frac{\sqrt{3}}{2} & 0 \\
    \frac{\sqrt{3}}{2} & -\frac{1}{2} & 0 \\
    0 & 0 & 1
  \end{bmatrix}
  \times P_1 \\

  &=
  \begin{bmatrix}
    -\frac{1}{2} \sin(\alpha) \\
    \frac{\sqrt{3}}{2} \sin(\alpha) \\
    \cos(\alpha)
  \end{bmatrix}
\end{align}
$$

These three points give us a plane, and we can calculate the normal vector by
taking the cross product of \\( P_1 - O \\) and \\( P_2 - O \\):

$$
\begin{align}
  \mathbf{N} &=
  \begin{bmatrix}
    \sin(\alpha) \\
    0 \\
    \cos(\alpha)
  \end{bmatrix}
  \times
  \begin{bmatrix}
    -\frac{1}{2} \sin(\alpha) \\
    \frac{\sqrt{3}}{2} \sin(\alpha) \\
    \cos(\alpha)
  \end{bmatrix} \\

  &=
  \begin{bmatrix}
    \frac{\sqrt{3}}{2} \cos(\alpha) \\
    \frac{1}{2} \cos(\alpha) + \frac{1}{2} \sin^2(\alpha) \\
    -\frac{1}{2} \sin(\alpha)
  \end{bmatrix}
\end{align}
$$

We can now project \\( \mathbf{V\_2} \\) onto this plane using the formula:

$$
Q = P - \frac{\mathbf{V_2} \cdot \mathbf{N}}{\|\mathbf{N}\|^2} \cdot \mathbf{N}
$$
